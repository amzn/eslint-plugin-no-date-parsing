'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

module.exports.rules = {
  'no-date-parsing': require('./rules/no-date-parsing')
};

module.exports.configs = {
  recommended: {
    plugins: ["no-date-parsing"],
    env: {
      browser: true,
    },
    rules: {
      "no-date-parsing/no-date-parsing": "error",
    },
  }
};
