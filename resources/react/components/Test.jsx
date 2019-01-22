import React, { PureComponent } from 'react';

/**
 * @class
 * @classdesc
 */
export default class Test extends PureComponent {
  static defaultProps = {
  };

  constructor(props) {
      super(props);
      this.state = {};
  }

  render() {
      const { className, text = '' } = this.props;
      return (
          <div className={`${className}`}>
              <p>{text}</p>
          </div>
      );
  }
}
