import React, { Component, PureComponent, memo } from 'react';
import Repeat from '@components/Repeat';
import Test from '@components/Test';

const TestRepeat = Repeat(Test);
/**
 * Example
 * @class
 * @description
 */
export default class Example extends PureComponent {
    static defaultProps = {
        i18n: {
        },
    };

    constructor(props) {
        super(props);
        const { store } = props;
        this.unsubscribe = null;
        this.state = store ? store.getInitialState() : {};
        this.inputRef = React.createRef();
    }

    // componentWillReceiveProps(nextProps) {
    //     // 此處setState不會觸發react lifecycle
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    // // 優化效能時使用，return將不觸發render
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     // render前觸發
    // }

    buttonClick = () => {
        this.props.action.findExample({ count: 1 });
    }

    updateTitle = () => {
        const { value } = this.inputRef.current;
        this.props.action.updateTitle(value);
    }

    render() {
        const { title, texts } = this.state;
        return (
            <div className='container'>
                <div>
                    <h1>{title}</h1>
                    <button onClick={this.buttonClick}>ajax test</button>
                    <br />
                    <input ref={this.inputRef} type='text'/>
                    <br />
                    <button onClick={this.updateTitle}>update title</button>
                </div>
                <div>
                    <TestRepeat data={texts}></TestRepeat>
                </div>
            </div>
        );
    }

    // componentDidUpdate(prevProps, prevState) {
    //     // render後觸發
    // }

    // componentWillMount() {
    //     // 組件將要被掛載時觸發（只會觸發一次）
    // }

    componentDidMount() {
        this.unsubscribe = this.props.store.listen(this.storeChange);
        // 這裡可以發送 init ajax
    }

    // componentWillUnmount() {
    //     // 組件卸載時觸發
    //     // this.unsubscribe()
    // }

    storeChange = (nextState) => {
        this.setState(nextState);
    }
}
