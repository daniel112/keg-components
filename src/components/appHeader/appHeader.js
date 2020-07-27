import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@simpleviewinc/re-theme'
import { get } from 'jsutils'
import { View } from 'KegView'
import { Button } from 'KegButton'
import { Icon } from 'KegIcon'
import { H6 } from '../typography'
import { renderFromType } from '../../utils'
import { useThemePath } from '../../hooks'

/**
 * AppHeader
 * @summary custom header component
 * @param {Object} props - see PropTypes below
 *
 * @returns {Component} - header component
 */
export const AppHeader = props => {
  const theme = useTheme()

  const {
    title,
    styles,
    RightComponent,
    CenterComponent,
    LeftComponent,
    onLeftClick,
    leftIcon,
    onRightClick,
    rightIcon,
    shadow,
    ellipsis,
    themePath,
    type = 'default',
    children,
  } = props

  const [headerStyles] = useThemePath(themePath || `appHeader.${type}`, styles)
  // builds the left, center, and right section based on props

  return (
    <View
      data-class='app-header-main'
      style={theme.join(
        headerStyles.main,
        shadow && get(headerStyles, ['shadow'])
      )}
    >
      { children || (
        <>
          <Side
            style={headerStyles.content}
            iconName={leftIcon}
            action={onLeftClick}
          >
            { LeftComponent }
          </Side>

          <Center
            ellipsis={ellipsis}
            theme={theme}
            style={headerStyles.content.center}
            title={title}
          >
            { CenterComponent }
          </Center>

          <Side
            right
            style={headerStyles.content}
            iconName={rightIcon}
            action={onRightClick}
          >
            { RightComponent }
          </Side>
        </>
      ) }
    </View>
  )
}

AppHeader.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.object,
  RightComponent: PropTypes.element,
  LeftComponent: PropTypes.element,
  CenterComponent: PropTypes.element,
  onLeftClick: PropTypes.func,
  leftIcon: PropTypes.string,
  onRightClick: PropTypes.func,
  rightIcon: PropTypes.string,
  shadow: PropTypes.bool,
  ellipsis: PropTypes.bool,
  themePath: PropTypes.string,
}

/**
 * Center
 * @summary gets the center section for the header component
 * @param {Object} props
 * @property {Object} theme - re-theme object used for styling
 * @property {Boolean=} ellipsis - applies ellipsis on text. default true
 * @property {Object} style
 * @property {String=} title - title displayed in the center 
 * @property {Component} children  - custom component to display on the center section. overrides the other props

 * @returns {Component} - center component
 */
const Center = props => {
  const { style, title, ellipsis = true, children } = props

  return (
    <View
      data-class='app-header-content-center'
      style={style.main}
    >
      { (children && renderFromType(children, {}, null)) || (
        <H6
          ellipsis={ellipsis}
          style={style.content.title}
        >
          { title }
        </H6>
      ) }
    </View>
  )
}

/**
 * Side
 * @summary builds the side sections of the appheader
 * @param {Object} props
 * @property {Object} style
 * @property {String=} iconName - name of icon to use (FontAwesome icons). uses the Icon component
 * @property {Function} action - function to perform on section click
 * @property {Component} children  - custom component to display on the section. overrides the other props
 * @property {Boolean} right - to decide which side theme to use
 *
 * @returns {Component} - section component
 */
const Side = props => {
  const { style, iconName, action, children, right } = props

  const position = right ? 'right' : 'left'
  // get the styles for the specified position
  const contentStyles = get(style, [ position, 'content', 'main' ])
  const iconProps = {
    style,
    iconName,
    position,
  }

  return (
    <View
      data-class={`app-header-content-${position}`}
      style={get(style, [ position, 'main' ])}
    >
      { /* if 'action' is passed in, use a button to wrap the icon */ }
      { (children && renderFromType(children, {}, null)) ||
        (action ? (
          <Button
            styles={{ main: contentStyles }}
            onClick={action}
          >
            { iconName && <CustomIcon {...iconProps} /> }
          </Button>
        ) : (
          iconName && (
            <View styles={{ main: contentStyles }}>
              <CustomIcon {...iconProps} />
            </View>
          )
        )) }
    </View>
  )
}

/**
 * CustomIcon
 * @summary Creates a customized Icon Component for the side components
 * @param {Object} props
 * @property {Object} style - default theme style
 * @property {String} iconName - icon name
 * @property {String} position - side position (left/right)
 *
 * @returns {Component} - Customized Icon component
 */
const CustomIcon = props => {
  const { style, iconName, position } = props

  return (
    <Icon
      name={iconName}
      styles={get(style, [ position, 'content', 'icon' ])}
    />
  )
}
