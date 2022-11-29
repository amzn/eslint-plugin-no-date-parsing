'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { TypeFlags } from 'typescript';

const rule = ESLintUtils.RuleCreator(() => 'https://github.com/amzn/eslint-plugin-no-date-parsing')({
  name: 'no-date-parsing',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow `Date` string parsing',
      recommended: 'error'
    },
    messages: {
      mustBeTyped: 'Argument to `Date` must have a TypeScript type.',
      noNewDate: 'Parsing of date strings with `new Date` is strongly discouraged due to browser differences and inconsistencies.',
      noDateParse: 'Parsing of date strings with `Date.parse` is strongly discouraged due to browser differences and inconsistencies.'
    },
    schema: []
  },
  defaultOptions: [],
  create: (context) => {
    const { program, esTreeNodeToTSNodeMap } = ESLintUtils.getParserServices(context);
    const checker = program.getTypeChecker();

    /**
     * Disallow Date constructor with unknown or non-numeric types
     * @param node node to evaluate
     */
    function checkConstructor(node: TSESTree.NewExpression | TSESTree.CallExpression) {
      const tsNode = esTreeNodeToTSNodeMap.get(node.arguments[0]);
      const nodeType = checker.getTypeAtLocation(tsNode);
      const constrained = checker.getBaseConstraintOfType(nodeType);
      const type = constrained || nodeType;
      if (type.flags & TypeFlags.Any || type.flags & TypeFlags.Unknown) {
        context.report({
          node,
          messageId: 'mustBeTyped'
        });
      } else if (!(type.flags & TypeFlags.NumberLike)) {
        context.report({
          node,
          messageId: 'noNewDate'
        });
      }
    }

    /**
     * Disallow Date.parse
     */
    function checkDateParse(node: TSESTree.CallExpression) {
      context.report({
        node,
        messageId: 'noDateParse'
      });
    }

    return {
      'CallExpression[callee.name="Date"][arguments.length!=0]': checkConstructor,
      'NewExpression[callee.name="Date"][arguments.length!=0]': checkConstructor,
      'CallExpression[callee.object.name="Date"][callee.property.name="parse"]': checkDateParse
    };
  }
});

export = rule;
