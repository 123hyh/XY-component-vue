/*
 * @Author: your name
 * @Date: 2020-07-01 23:14:44
 * @LastEditTime: 2020-07-02 00:41:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /XY-component-vue/src/utils/request.ts
 */ 
import { AnyObject } from '@/utils';
type MethodType = 'GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS'
type CredentialsType = 'include'|'same-origin'|'omit'
type InterceptRequestHandler = ( args:RequestParams ) => RequestParams
type RequestParams = {
  url: string,
  method: MethodType,
  data?:any,
  headers?: Headers | AnyObject,
  credentials?:CredentialsType,
  timeout?: number
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
/**
 * @description: 请求方法
 * @param {type} 
 * @return: 
 */

async function  request( params: RequestParams ) {
  const { url, data: body, timeout, ...options } = params;
  // 是否添加超时
  const res = await  Promise.race( 
    [
      timeout && timeoutFn( timeout ),
      fetch(
        url, 
        {
          ...options,
          body: JSON.stringify( body ) 
        } 
      )
    ].filter( Boolean ) 
  );

  if ( res instanceof Response ) {
    const data  = await res.body;
    if ( /^(4|5)\d{2}/.test( res.status.toString() ) ) {
      return Promise.reject( data );
    } else {
      return Promise.resolve( await res.json() );
    }
  } else {
    return Promise.reject( res );
  }
}

export class Request {
  private static  headers:AnyObject = { 'Content-Type':'application/json' }
  private baseUrl: string;
  private timeout: any;
  private requestHandler: InterceptRequestHandler;
  private responseHandler: InterceptRequestHandler;
  constructor( options:{baseUrl:string, timeout:number } ) {
    this.baseUrl = options.baseUrl;
    this.timeout = options.timeout ?? 0;
    this.requestHandler = ( args: RequestParams ) => args;
    this.responseHandler = ( args: RequestParams ) => args;
  }

  /**
   * @description: 发送请求方法
   * @param {type} 
   * @return: 
   */
  public send( requestParams:RequestParams ) {
    const url = this.baseUrl + requestParams.url;
    const headers = { ...Request.headers };
    
    // 判断请求体是否为formData，设置请求头
    if ( requestParams.data instanceof FormData ) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    const transformParams = this.requestHandler( { 
      ...requestParams, 
      url,
      headers,
      timeout:this.timeout
    } );
    return request( 
      transformParams
    );
  }

  /**
   * @description: 设置请求 头部信息
   * @param {string} key  
   * @param {any} value  
   * @return: 
   */
  public setHeader( key:string, value:string|number|boolean|null|undefined ) {
    return Request.headers[key] = value;
  }
  /**
   * @description: 注册拦截器
   * @param {type} 
   * @return: 
   */
  public registerIntercept( 
    requestHandler:InterceptRequestHandler,
    responseHandler:InterceptRequestHandler 
  ) {
    this.requestHandler = requestHandler;
    this.responseHandler = responseHandler;
  }
}

let headers: AnyObject = { 'Content-Type':'application/json' },
  requestIntercept = ( args:RequestParams ) => args,
  responseIntercept = ( args:any ) => args;
type CreateRequestParams = {baseUrl:string, timeout: number}
/**
 * @description: 请求出口方法
 * @param {type} 
 * @return: 
 */
async function  _request( params: RequestParams ) {
  const { url, data: body, timeout, ...options } = params;
  // 是否添加超时
  const res = await  Promise.race( 
    [
      timeout && timeoutFn( timeout ),
      fetch(
        url, 
        {
          ...options,
          body: JSON.stringify( body ) 
        } 
      )
    ].filter( Boolean ) 
  );

  if ( res instanceof Response ) {
    const data  = await res.body;
    if ( /^(4|5)\d{2}/.test( res.status.toString() ) ) {
      return Promise.reject( data );
    } else {
      return Promise.resolve( await res.json() );
    }
  } else {
    return Promise.reject( res );
  }
}
/**
 * @description: 创建 http Api
 * @param {type} 
 * @return: 
 */
export function createHttpReqest( 
  { baseUrl = '', timeout = 0 }: CreateRequestParams 
) {
  return function request( options: RequestParams ) {
    const { url:sourceURL, ...requestParams } = options;
    const url = baseUrl + sourceURL;
    const HEADERS = { ...headers };
    
    // 判断请求体是否为formData，设置请求头
    if ( requestParams.data instanceof FormData ) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    return _request( { ...requestParams, url, headers:HEADERS, timeout } );
  };
}
/**
 * @description: 获取请求头
 * @param {type} 
 * @return: 
 */
export function getHttpHeader() :AnyObject {
  return { ...headers };
}
/**
 * @description: 设置请求头
 * @param {type} 
 * @return: 
 */
export function setHttpHeader( key:string, value: any ) :boolean {
  headers[key] = value;
  return true;
}
/**
 * @description: 注册拦截器
 * @param {type} 
 * @return: 
 */
export function registerIntercept(
  requestInterceptCb:InterceptRequestHandler, 
  responseInterceptCb:any ) {
  requestIntercept = requestInterceptCb;
  responseIntercept = responseInterceptCb;
}