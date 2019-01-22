import React, { PureComponent } from 'react';

/**
 * ${Name}
 * @class
 * @classdesc
 */
export default class ${Name} extends PureComponent {
  static defaultProps = {
  };

  constructor(props) {
      super(props);
      this.state = {};
  }

  render() {
      const { className } = this.props;
      return (
          <div className={`${className}`}>
          </div>
      );
  }
}
