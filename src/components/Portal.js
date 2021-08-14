import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { render, unmountComponentAtNode } from 'react-dom'


export default class Portal extends Component {
  constructor() {
    super()
    this.portalElement = null
  }
  componentDidMount() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    this.portalElement = div
    this.componentDidUpdate()
  }
  componentDidUpdate() {
    // Animate fade on mount/unmount
    const duration = 200
    const styles = `
				.fade-enter { opacity: 0.01; }
				.fade-enter.fade-enter-active { opacity: 1; transition: opacity ${duration}ms; }
				.fade-leave { opacity: 1; }
				.fade-leave.fade-leave-active { opacity: .01; transition: opacity ${duration}ms; }
		`
	const groupProps = {...this.props};
	delete groupProps.transitionClass;
    render(
      <div>
        <style>{styles}</style>
        <TransitionGroup {...groupProps}>
          <CSSTransition timeout={{ enter: duration, exit: duration }} {...(this.props.transitionClass ? {className: this.props.transitionClass} : {})}>
            <div>{this.props.children}</div>
          </CSSTransition>
        </TransitionGroup>
      </div>,
      this.portalElement
    )
  }
  componentWillUnmount() {
    unmountComponentAtNode(this.portalElement)
    document.body.removeChild(this.portalElement)
  }
  render() {
    return null
  }
}

Portal.propTypes = {
  children: PropsTypes.arrayOf(PropsTypes.any),
}
