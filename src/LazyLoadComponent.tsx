import classComponent from 'vue-class-component';
import {  Component } from 'vue-tsx-support';
// import Vue from 'vue';
@classComponent( {
  components:{
    Test: ()=> import( '@/Test' )
  }
} )
export default class LozyLoadComponent extends Component<any, any> {
  public com:any = this.$createElement( 'div', 'test' )
  mounted() {
    import( '@/Test' ).then( v=>{
      console.log( v.default );
      // this.$set( this.$slots, 'default', this.$createElement( v.default )  );
    } );
  }
  public render() {
    debugger;
    return <div>
      {
        this.com
      }
    </div >;
  }
}