'use strict';

import utils from '../utils.js';
import AxiosHeaders from "./AxiosHeaders.js";

const headersToObject = (thing) => thing instanceof AxiosHeaders ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
export default function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  // 合并两个值
  function getMergedValue(target, source, caseless) {
    // 两个配置都为对象，递归直接合并
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      // caseless表示是否区分字段大小写
      return utils.merge.call({caseless}, target, source);
    } 
    // 前者不为对象，后者为对象，合并一个空对象
    else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } 
    // 后者为数组:浅拷贝后者
    else if (utils.isArray(source)) {
      return source.slice();
    }
    // 后者为不为对象或者数组：直接使用后者
    return source;
  }

  // eslint-disable-next-line consistent-return
  // 深层合并策略
  function mergeDeepProperties(a, b, caseless) {
    // b有定义，对a，b进行合并
    if (!utils.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } 
    // b无定义，且a有定义，直接使用a
    else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  // 只使用b中值(a中有值也不使用)的合并策略
  function valueFromConfig2(a, b) {
    // b有定义，则只使用b
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  // b中有值则用b，否则用a的合并策略
  function defaultToConfig2(a, b) {
    // b有定义，则只使用b
    if (!utils.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } 
    // b无定义，且a有定义，只使用a
    else if (!utils.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  // 和深层合并基本相同，判断使用 in 语句 为何???
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  // 每个字段的合并策略
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  // 合并
  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    // 其他非内置的属性使用深度合并的策略
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}
