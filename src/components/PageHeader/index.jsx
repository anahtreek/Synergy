import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import requireImage from '../../requireImage';

import Logo from '../Logo';
import ProfileSwitcher from '../ProfileSwitcher';

import styles from './styles.css';

let mobileProfiles = [
  { label: 'LCM', value: 'Location Campus Manager' },
  { label: 'CH', value: 'Campus Head' },
  { label: 'TPU', value: 'Technical Executive' },
  { label: 'HR', value: 'HR Executives' },
  { label: 'Candidate', value: 'Candidate' },
];

let bodyElem = null;
class PageHeader extends Component {
  constructor() {
    super();
    this.state = {
      isAside: false,
      container: null,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handle, true);
    bodyElem = document.querySelector('body');
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handle, true);
  }

  getContainer = (ref) => {
    this.setState({ container: ref });
  }

  isActiveRoute(route) {
    const { currentRoute } = this.props;
    return !currentRoute || currentRoute.url === route.url;
  }

  handle = (e) => {
    const el = this.state.container;
    if (!el.contains(e.target)) {
      bodyElem.classList.remove('asideOpen');
      this.setState({ isAside: false });
    }
  }

  logout = ($event) => {
    // $event.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }

  asideToggle = () => {
    if (!bodyElem.classList.contains('asideOpen')) {
      bodyElem.classList.add('asideOpen');
    } else {
      bodyElem.classList.remove('asideOpen');
    }
    this.setState({
      isAside: !this.state.isAside,
    });
  }

  render() {
    const { routes, title, crumbs, className, profileLink, roles, enableIcons } = this.props;
    const { isAside } = this.state;

    return (
      <header className={`${[styles.pageHeader, className].join(' ')}${isAside ? styles.asideOpen : ''}`}>
        <div className={styles.topbar}>
          <div className={`${styles.cWrap} container`}>
            <div className={styles.logoWrap}>
            <div className={styles.logoWrap}>
            {enableIcons && enableIcons.mW && enableIcons.mW === "N" ? '' :<span className="desktop-block">mW</span>}
            {enableIcons && enableIcons.mW && enableIcons.mW === "N" ? '' :<i className={[styles.spacer, 'desktop-block'].join(' ')} />}
              <div
                className={[styles.humbergerIcon, 'mobile-block'].join(' ')}
                onClick={this.asideToggle}
              >
                <span className={styles.line} />
                <span className={styles.line} />
                <span className={styles.line} />
              </div></div>
              {enableIcons && enableIcons.title && enableIcons.title === "N" ? '' :<Logo size="sm" />}
            </div>
            <ul className={styles.quickActions}>
              {enableIcons && enableIcons.search && enableIcons.search === "N" ? '' :<li className={styles.qAction}>
                <Link to="/cpc"><img src={requireImage('./i/icons/search-icon.png')} alt="" /></Link>
              </li>}
              {enableIcons && enableIcons.roles && enableIcons.roles === "N" ? '' :<li className={[styles.qAction, 'desktop-block'].join(' ')}>
                <ProfileSwitcher options={roles}/>
              </li>}
              {enableIcons && enableIcons.help && enableIcons.help === "N" ? '' :<li className={[styles.qAction, 'desktop-block'].join(' ')}>
                <a href=""><img src={requireImage('./i/icons/help-icon.png')} alt="" /></a>
              </li>}
              { profileLink.length > 0 &&
                <li className={`${styles.qaction} desktop-block`}>
                  <Link to={profileLink}>
                    <img className={styles.profileIcon} src={requireImage('./i/icons/profile-icon.png')} alt="" />
                  </Link>
                </li>
              }
              {enableIcons && enableIcons.logout && enableIcons.logout === "N" ? '' :<li className={[styles.qAction, 'desktop-block'].join(' ')}>
                <a href="" onClick={this.logout} title="Logout">
                  <img src={requireImage('./i/icons/logout-icon.png')} alt="" />
                </a>
              </li>}
            </ul>
          </div>
        </div>
        <div className={[styles.navbar, 'desktop-block'].join(' ')}>
          <div className={`${styles.cWrap} container`}>
            <div className={styles.navbarCpage}>
              {!title ? crumbs.map((c, i) => (
                <span className={styles.crumb} key={i}>{c}</span>
              )) : title}
            </div>
            <nav>
              <ul className={styles.pageNav}>
                {routes.map((page, i) => (
                  <li key={i}>
                    <Link
                      to={page.url}
                      className={this.isActiveRoute(page) ? styles.current : null}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="mobile-block">
          <aside className={[styles.asideNav, profileLink.length > 0 ? styles.hasProfile : ''].join(' ')} ref={this.getContainer}>
            <div className={styles.asideHead}>
              {enableIcons && enableIcons.title && enableIcons.title === "N" ? '' :<Logo size="sm" />}
              <span className={styles.closeIcon} onClick={this.asideToggle} />
            </div>
            <nav className={styles.asideBody}>
              <ul className={styles.pageNav}>
                {routes.map((page, i) => (
                  <li key={i}>
                    <Link
                      to={page.url}
                      className={this.isActiveRoute(page) ? styles.current : null}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
                {enableIcons && enableIcons.roles && enableIcons.roles === "N" ? '' :<li>
                  <ProfileSwitcher
                    options={mobileProfiles}
                  />
                </li>}
              </ul>
            </nav>
            <div className={styles.asideFoot}>
              <div>
                {enableIcons && enableIcons.help && enableIcons.help === "N" ? '' :<a href="">
                  <img src={requireImage("./i/icons/help-icon.png")} alt="" />
                  <span>Help</span>
                </a>}
                { profileLink.length > 0 &&
                  <Link to={profileLink} className={styles.profile}>
                    <img className={styles.profileIcon} src={requireImage("./i/icons/profile-icon.png")} alt="" />
                    <span>Profile</span>
                  </Link>
                }
              </div>
              {enableIcons && enableIcons.logout && enableIcons.logout === "N" ? '' :<a href="" onClick={this.logout} title="Logout">
                <img src={requireImage("./i/icons/logout-icon.png")} alt="" />
                <span>Logout</span>
              </a>}
            </div>
          </aside>
        </div>
      </header>
    );
  }
}

PageHeader.defaultProps = {
  logout: noop,
  currentRoute: null,
  routes: [],
  crumbs: [],
  title: '',
  className: '',
  profileLink: '',
  roles: null
};

PageHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  })),
  currentRoute: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string,
  }),
  title: PropTypes.string,
  crumbs: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  profileLink: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  roles: PropTypes.array
};

export default withRouter(PageHeader);
