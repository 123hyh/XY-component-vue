import classComponent from 'vue-class-component';
import {  Component } from 'vue-tsx-support';

@classComponent
export default class LozyLoadComponent extends Component<any> {
  public render() {
    return <div>123</div>;
  }
}