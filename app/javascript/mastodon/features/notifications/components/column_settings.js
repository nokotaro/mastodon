import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage } from 'react-intl';
import ClearColumnButton from './clear_column_button';
import SettingToggle from './setting_toggle';

export default class ColumnSettings extends React.PureComponent {

  static propTypes = {
    settings: ImmutablePropTypes.map.isRequired,
    pushSettings: ImmutablePropTypes.map.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
  };

  onPushChange = (key, checked) => {
    this.props.onChange(['push', ...key], checked);
  }

  render () {
    const { settings, pushSettings, onChange, onClear } = this.props;

    const alertStr = <FormattedMessage id='notifications.column_settings.alert' defaultMessage='Desktop notifications' />;
    const showStr  = <FormattedMessage id='notifications.column_settings.show' defaultMessage='Show in column' />;
    const soundStr = <FormattedMessage id='notifications.column_settings.sound' defaultMessage='Play sound' />;

    const showPushSettings = pushSettings.get('browserSupport') && pushSettings.get('isSubscribed');
    const pushStr = showPushSettings && <FormattedMessage id='notifications.column_settings.push' defaultMessage='Push notifications' />;
    const pushMeta = showPushSettings && <FormattedMessage id='notifications.column_settings.push_meta' defaultMessage='This device' />;

    return (
      <div>
        <div className='column-settings__row'>
          <ClearColumnButton onClick={onClear} />
        </div>

        <div role='group' aria-labelledby='notifications-follow'>
          <span id='notifications-follow' className='column-settings__section'><FormattedMessage id='notifications.column_settings.follow' defaultMessage='New followers:' /></span>

          <div className='column-settings__row'>
            <SettingToggle prefix='notifications_desktop' settings={settings} settingPath={['alerts', 'follow']} onChange={onChange} label={alertStr} />
            {showPushSettings && <SettingToggle prefix='notifications_push' settings={pushSettings} settingPath={['alerts', 'follow']} meta={pushMeta} onChange={this.onPushChange} label={pushStr} />}
            <SettingToggle prefix='notifications' settings={settings} settingPath={['shows', 'follow']} onChange={onChange} label={showStr} />
            <SettingToggle prefix='notifications' settings={settings} settingPath={['sounds', 'follow']} onChange={onChange} label={soundStr} />
          </div>
        </div>

        <div role='group' aria-labelledby='notifications-favourite'>
          <span id='notifications-favourite' className='column-settings__section'><FormattedMessage id='notifications.column_settings.favourite' defaultMessage='Favourites:' /></span>

          <div className='column-settings__row'>
            <SettingToggle prefix='notifications_desktop' settings={settings} settingPath={['alerts', 'favourite']} onChange={onChange} label={alertStr} />
            {showPushSettings && <SettingToggle prefix='notifications_push' settings={pushSettings} settingPath={['alerts', 'favourite']} meta={pushMeta} onChange={this.onPushChange} label={pushStr} />}
            <SettingToggle prefix='notifications' settings={settings} settingPath={['shows', 'favourite']} onChange={onChange} label={showStr} />
            <SettingToggle prefix='notifications' settings={settings} settingPath={['sounds', 'favourite']} onChange={onChange} label={soundStr} />
          </div>
        </div>

        <div role='group' aria-labelledby='notifications-mention'>
          <span id='notifications-mention' className='column-settings__section'><FormattedMessage id='notifications.column_settings.mention' defaultMessage='Mentions:' /></span>

          <div className='column-settings__row'>
            <SettingToggle prefix='notifications_desktop' settings={settings} settingPath={['alerts', 'mention']} onChange={onChange} label={alertStr} />
            {showPushSettings && <SettingToggle prefix='notifications_push' settings={pushSettings} settingPath={['alerts', 'mention']} meta={pushMeta} onChange={this.onPushChange} label={pushStr} />}
            <SettingToggle prefix='notifications' settings={settings} settingPath={['shows', 'mention']} onChange={onChange} label={showStr} />
            <SettingToggle prefix='notifications' settings={settings} settingPath={['sounds', 'mention']} onChange={onChange} label={soundStr} />
          </div>
        </div>

        <div role='group' aria-labelledby='notifications-reblog'>
          <span id='notifications-reblog' className='column-settings__section'><FormattedMessage id='notifications.column_settings.reblog' defaultMessage='Boosts:' /></span>

          <div className='column-settings__row'>
            <SettingToggle prefix='notifications_desktop' settings={settings} settingPath={['alerts', 'reblog']} onChange={onChange} label={alertStr} />
            {showPushSettings && <SettingToggle prefix='notifications_push' settings={pushSettings} settingPath={['alerts', 'reblog']} meta={pushMeta} onChange={this.onPushChange} label={pushStr} />}
            <SettingToggle prefix='notifications' settings={settings} settingPath={['shows', 'reblog']} onChange={onChange} label={showStr} />
            <SettingToggle prefix='notifications' settings={settings} settingPath={['sounds', 'reblog']} onChange={onChange} label={soundStr} />
          </div>
        </div>
      </div>
    );
  }

}
