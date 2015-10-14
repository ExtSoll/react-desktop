import React, { Component, PropTypes } from 'react';
import Styling, { mergeStyles, applyStyle } from './Styling';
import Controls from './TitleBar/Controls';

var styles = {
  osx_10_11: {
    WebkitUserSelect: 'none',
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
    height: '20px',
    backgroundImage: '-webkit-linear-gradient(top, #ededed 0px, #e7e7e7 2px, #d1d1d1 100%)',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#afafaf',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopColor: '#ffffff',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    paddingLeft: '3px',
    paddingRight: '3px',

    toolbar: {
      height: '36px',
      paddingLeft: '9px',
      paddingRight: '9px'
    },

    title: {
      WebkitUserSelect: 'none',
      cursor: 'default',
      fontFamily: '"San Francisco", "Helvetica Neue", "Lucida Grande"',
      fontSize: '13px',
      color: '#2e2e2e',
      flex: 1,
      textAlign: 'center',
      lineHeight: '21px'
    }
  }
};

@Styling
class TitleBar extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element, React.PropTypes.array]),
    style: PropTypes.object,
    title: PropTypes.string,
    controls: PropTypes.bool
  };

  get styles() {
    return mergeStyles(styles.osx_10_11, this.props.style);
  }

  render() {
    let { children, controls, title, ...props } = this.props;

    let styles = this.styles;
    if (children) {
      styles = mergeStyles(styles, this.styles.toolbar);
    }

    let titleStyle = this.styles.title;
    if (this.props.controls) {
      titleStyle = Object.assign(titleStyle, {paddingRight: '60px'});
    }

    controls = !controls || <Controls/>;
    title = !title || (
        <div style={titleStyle}>
          {this.props.title}
        </div>
      );

    return (
      <div
        ref="element"
        {...props}
        style={applyStyle(styles)}
      >
        {controls}
        {title}
        {children}
      </div>
    );
  }
}

export default TitleBar;
