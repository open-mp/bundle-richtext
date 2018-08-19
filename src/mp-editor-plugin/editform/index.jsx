import React, {PureComponent} from 'react';
import { Button, Checkbox, ColorPicker} from 'zent';

import ControlGroup from './ControlGroup';
import Richtext from './editor';
import './editor.pcss'
const reserColor = '#f9f9f9';

export default class RichtextEditor extends PureComponent {
  static defaultProps = {
    richTextConfig: {},
  };

  handleResetBackground = () => {
    const {design, instance} = this.props;
    design.modifyInstance(instance, {color: reserColor});
  };

  onColorChange = color => {
    const {design, instance} = this.props;
    design.modifyInstance(instance, {color: color});
  };

  onFullscreenChange = e => {
    let isFullscreen = Number(e.target.checked);
    const {design, instance} = this.props;
    design.modifyInstance(instance, {fullscreen: isFullscreen});
  };

  onEditorChange = val => {
    const {design, instance} = this.props;
    design.modifyInstance(instance, {content: val});
  };

  render() {
    const { instance: value, richTextConfig } = this.props;

    return (
      <div className="zent-design-component-richtext-editor">
        <ControlGroup focusOnLabelClick={false} label="背景颜色：">
          <div className="input-append">
            <ColorPicker
              className="zent-design-component-richtext-editor__color-picker-popover"
              color={value.color}
              onChange={this.onColorChange}
            />
            <Button onClick={this.handleResetBackground}>重置</Button>
          </div>

          <label htmlFor="fullscreen" className="control-label">
            是否全屏：
          </label>
          <Checkbox
            className="zent-design-component-richtext-editor-checkbox-wrap"
            name="fullscreen"
            checked={value.fullscreen}
            onChange={this.onFullscreenChange}
          >
            全屏显示
          </Checkbox>
        </ControlGroup>

        <div className="zent-design-component-richtext-editor-group">
          <Richtext
            value={value.content}
            onChange={this.onEditorChange}
            editorConfig={{
              initialFrameWidth: 386,
              initialFrameHeight: 600,
            }}
            {...richTextConfig}
          />
        </div>
      </div>
    );
  }
}
