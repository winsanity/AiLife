import React, { Component } from 'react'
import { Text, View, StyleSheet, LayoutAnimation } from 'react-native'

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      startDelay: this.props.startDelay || 300,
    }
  }

  componentDidMount() {
    LayoutAnimation.spring();
    if (this.refs.root) {
      this.timer = setTimeout(() => {
          this.setState({ progress: this.props.progress })
        }, this.state.startDelay)

    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.refs.root) {
        this.setState({ progress: nextProps.progress })
    }
  }

  componentWillUpdate() {
    if (this.refs.root) {
        LayoutAnimation.spring()
    }
  }

  componentWillUnmount() {
   // 如果存在this.timer，则使用clearTimeout清空。
   // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
   this.timer && clearTimeout(this.timer);
 }

  render() {
    return (
        <View style={this.props.style} ref="root">
            <View style={[styles.flexBox, styles.progressBar, this.props.style]}>
                <View style={[{ flex: this.state.progress },
                    { backgroundColor: this.props.filledColor || '#D50000' }]} />
                <View style={[{ flex: 100 - this.state.progress },
                    { backgroundColor: this.props.unfilledColor || '#FFF' }]} />
            </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    flexBox: {
        flexDirection: 'row',
    },
    progressBar: {
        overflow: 'hidden',
        height: 14,
        borderWidth: 1,
        borderColor: '#D50000',
        borderRadius: 10,
    }
});

ProgressBar.PropTypes = {
    style: React.PropTypes.node,
    progress: React.PropTypes.number.isRequired,
    filledColor: React.PropTypes.string,
    unfilledColor: React.PropTypes.string,
    startDelay: React.PropTypes.number,
};
