
import { componentFactory } from 'vue-tsx-support';
export default componentFactory.create( {
  props: {
    list: {
      type: Array,
      default: () => Array.from( { length: 10000 } ).map( ( _, i ) => i )
    }
  },
  mounted() {
    const ob = new IntersectionObserver( ( [ entris ] )=>{
      const { isIntersecting:visible, intersectionRatio: ratio } = entris;
      // 上滚动时
      if ( visible === false && ratio !==0 &&  ratio <= 0.2 ) {
        console.log( '向上滚动' );
      } else if ( visible === true && ratio >=0.8 ) {
        console.log( '向下滚动' );
      }
    }, {
      threshold: [ 0.2, 0.8 ]
    }
    );
    const elem = this.$refs['container'] as Element;

    ob.observe( elem );
  },
  render() {
    return  <div class="xy-long-list-box">
      <div class="xy-long-list-container" ref='container'>
        {
          this.list.map( ( item )=>{
            const key = item as number;
            return <div key={key}>{item}</div>;
          } )
        }
      </div>
    </div>;
  }
} );