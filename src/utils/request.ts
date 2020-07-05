/*
 * @Author: your name
 * @Date: 2020-07-01 23:14:44
 * @LastEditTime: 2020-07-05 17:52:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /XY-component-vue/src/utils/request.ts
 */ 
import { AnyObject, condom } from '@/utils';

type MethodType = 'GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS'
type CredentialsType = 'include'|'same-origin'|'omit'
/**
 * 请求参数集合
 * @property { string } url 请求 path
 * @property { string } method 请求 方法
 * @property { FormData | JSON } data 请求体
 * @property { object } headers 请求头部集合
 * @property { include | same-origin | omit } credentials 请求头部集合
 * @property { Number } timeout 指定请求超时的毫秒数(0 表示无超时时间)
 * @property { blob | json } responseType 指定响应类型
 * 
 */
type RequestParams = {
  url: string,
  method: MethodType,
  data?: any,
  headers?: Headers | AnyObject,
  credentials?: CredentialsType,
  timeout?: number,
  responseType?: 'blob' | 'json' | 'text'
}

// 超时定时器
function timeoutFn( timeout: number ) {
  return new Promise( ( resolve )=>{
    setTimeout( () => {
      resolve( {
        status: 504,
        message: '超时了~'
      } );
    }, timeout );
  } );
}


type CreateRequestParams = { baseUrl: string, timeout: number }

/**
 * 处理请求body
 * @description: 处理请求body
 * @param {type} 
 * @return: 
 */
function handlerRequestBody <T>( data: T | string ) {
  if (
    !( data instanceof FormData ) && 
    typeof data === 'object' 
  ) {
    data = JSON.stringify( data );
  }
  return data;
}

type InterceptRequestHandler = ( args:RequestParams ) => RequestParams;
type InterceptResponsetHandler = <T>( args: T ) => any
/**
 * 创建 http Api
 * @description: 创建 http Api
 * @param {type}
 * @return: 
 */
export function createHttpReqest( 
  { baseUrl = '', timeout = 0 }: CreateRequestParams 
) {

  let headers: AnyObject = { 'Content-Type':'application/json' },
    requestIntercept = ( args: RequestParams ) => args,
    responseIntercept:any = null;
    
  /**
   * 请求出口方法
   * @description: 请求出口方法
   * @param {type} 
   * @return: 
   */

  async function  _request( params: RequestParams ) {
    if ( requestIntercept ) {
      params = requestIntercept( params );
    }
    const { url, data: body, timeout, responseType = 'json', ...options } = params;
  
    // 添加超时处理
    let res: any = await  Promise.race( 
      [
        timeout && timeoutFn( timeout ),
        fetch(
          url, 
          {
            ...options,
            body: handlerRequestBody( body )
          } 
        )
      ].filter( Boolean ) 
    );
    if ( res instanceof Response ) {
      const data  = await res.body;
      // 判断 状态码 是否出错
      if ( /^(4|5)\d{2}/.test( res.status.toString() ) ) {
        return Promise.reject( data );
      } else {
        const responseObj = {
          blob: res.blob,
          json: res.json,
          text: res.text,
        };
        if ( responseType in responseObj ) {
          res = await responseObj[responseType].call( res );
        }
        // 响应拦截器
        if ( responseIntercept ) {
          res = await condom( () => responseIntercept( res ) );
        }
        // 处理返回结果
        return Promise.resolve( res );
      }
    } else {
      return Promise.reject( res );
    }
  }
  
  return {
    /**
     * 暴露的请求方法
     * @param options 
     */
    request : function request( options: RequestParams ) {
      const { url: sourceURL, ...requestParams } = options;

      // 禁用直接修改 header
      const HEADERS = { ...headers };
      return _request( { 
        ...requestParams,
        url: baseUrl + sourceURL,
        headers: HEADERS, 
        timeout 
      } );
    },
    
    /**
     * @description: 获取请求头
     * @param {type} 
     * @return: {[key]: value}
     */
    getHttpHeader: function getHttpHeader() :AnyObject {
      return { ...headers };
    },
    
    /**
     * 设置 HTTP 请求头
     * @description: 
     * @param { String } headerName 头名称 
     * @param { any } value 头内容 
     * @return: 
     */
    setHttpHeader: function setHttpHeader( 
      headerName: string,
      value: any 
    ) : boolean {
      headers[headerName] = value;
      return true;
    },
    
    /**
     * 请求拦截器
     * @param beforeFn 回调
     */
    registerRequestIntercept( 
      beforeFn: ( options: RequestParams ) => 
        RequestParams & {[propName: string]: any} 
    ) {
      requestIntercept = beforeFn;
      return true;
    },

    /**
     * 响应拦截器
     * @param afterFn 回调
     */
    registerResponseIntercept( afterFn: ( ...args: any[] ) => any ) {
      responseIntercept = afterFn;
      return true;
    },
    /**
     * 收集请求错误日志
     */
    
    gatherErrorLog( { url, method }:{url: string, method: MethodType} ) {
      
    },
  };
}




export function registerHttpLog( 
  reqeustParams: RequestParams, 
  errorMessage:any ) {

}