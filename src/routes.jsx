import React from 'react';
import { Redirect } from 'react-router-dom';
import { META } from './config';
import Login from './containers/Login';
import DashboardCandidate from './containers/DashboardCandidate';

/**
 * Generate an object with all necessary fields to render a page.
 * @param {string} path - The page path
 * @param {string} title - THe page title (for SEO)
 * @param {Function} component - The component to be rendered. Containers can also be used
 * @param {string} description - The page description (for SEO) [OPTIONAL]
 * @param {string} keywords - The comma separated page keywords (for SEO) [OPTIONAL]
 * @param {string}  className - The className will apply to the whole page per route
 * @returns {object}
 */
const createPage = (path, title, component, description, keywords, className) => ({
  path,
  title: `${title} | ${META.PAGE_TITLE_SUFFIX}`,
  description: description || META.PAGE_DESCRIPTION,
  keywords: keywords || META.PAGE_KEYWORDS,
  component,
  className,
});

export default [
  createPage('/', 'Login', Login),
  createPage('/login', 'Login', Login),
  createPage('/candidate', 'Dashboard Candidate', DashboardCandidate, null, null, 'dashboard-cpc-page'), 
];
