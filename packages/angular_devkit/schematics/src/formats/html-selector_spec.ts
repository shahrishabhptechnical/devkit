/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { formatValidator } from './format-validator';
import { htmlSelectorFormat } from './html-selector';


describe('Schematics HTML selector format', () => {
  it('accepts correct selectors', done => {
    const data = { selector: 'my-selector' };
    const dataSchema = {
      properties: { selector: { type: 'string', format: 'html-selector' } },
    };

    formatValidator(data, dataSchema, [htmlSelectorFormat])
      .map(result => expect(result.success).toBe(true))
      .subscribe(done, done.fail);
  });

  it('rejects selectors starting with invalid characters', done => {
    const data = { selector: 'my-selector$' };
    const dataSchema = {
      properties: { selector: { type: 'string', format: 'html-selector' } },
    };

    formatValidator(data, dataSchema, [htmlSelectorFormat])
      .map(result => expect(result.success).toBe(false))
      .subscribe(done, done.fail);
  });

  it('rejects selectors starting with number', done => {
    const data = { selector: '1selector' };
    const dataSchema = {
      properties: { selector: { type: 'string', format: 'html-selector' } },
    };

    formatValidator(data, dataSchema, [htmlSelectorFormat])
      .map(result => expect(result.success).toBe(false))
      .subscribe(done, done.fail);
  });

  it('rejects selectors with non-letter after dash', done => {
    const data = { selector: 'my-1selector' };
    const dataSchema = {
      properties: { selector: { type: 'string', format: 'html-selector' } },
    };

    formatValidator(data, dataSchema, [htmlSelectorFormat])
      .map(result => expect(result.success).toBe(false))
      .subscribe(done, done.fail);
  });
});
