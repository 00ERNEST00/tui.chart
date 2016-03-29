/**
 * @fileoverview Test Item.
 * @author NHN Ent.
 *         FE Development Team <dl_javascript@nhnent.com>
 */

'use strict';

var Item = require('../../src/js/dataModels/item');

describe('test Item', function() {
    var item;

    beforeEach(function() {
        item = new Item();
    });

    describe('_initValues()', function() {
        it('item의 value들을 초기화 합니다.', function() {
            item.formatFunctions = [function(value) {
                return '00' + value;
            }];
            item._initValues(10);

            expect(item.value).toBe(10);
            expect(item.end).toBe(10);
            expect(item.formattedValue).toBe('0010');
            expect(item.formattedEnd).toBe('0010');
            expect(item.isRange).toBe(false);
        });

        it('value가 배열값이면 start도 초기화하고 formattedValue도 변경 합니다.', function() {
            item.formatFunctions = [function(value) {
                return '00' + value;
            }];
            item._initValues([10, 40]);

            expect(item.value).toBe(40);
            expect(item.end).toBe(40);
            expect(item.start).toBe(10);
            expect(item.formattedValue).toBe('0010 ~ 0040');
            expect(item.formattedEnd).toBe('0040');
            expect(item.formattedStart).toBe('0010');
            expect(item.isRange).toBe(true);
        });
    });

    describe('_createValues()', function() {
        it('전달된 value가 배열여부와 상관없이 무조건 배열로 만들고 내림차순 정렬하여 반환합니다.', function() {
            var actual = item._createValues([3, 1, 2, 10]),
                expected = [10, 3, 2, 1];

            expect(actual).toEqual(expected);
        });
    });

    describe('_calculateRatio()', function() {
        it('입력 value에 subNumber를 빼고 divNumber로 나눈뒤 baseRatio로 곱하여 반환합니다.', function() {
            var actual = item._calculateRatio(10, 2, 2, 0.5),
                expected = 2;

            expect(actual).toEqual(expected);
        });
    });

    describe('addRatio()', function() {
        it('value값 기준으로 ratio를 계산하여 ratio와 endRatio에 계산된 값을 할당합니다.', function() {
            item.value = 40;
            item.addRatio(100);

            expect(item.ratio).toBe(0.4);
            expect(item.endRatio).toBe(0.4);
        });

        it('start값이 있을 경우 start값 기준으로 startRatio도 계산하여 할당합니다.', function() {
            item.hasStart = true;
            item.start = 20;
            item.value = 40;
            item.addRatio(100);

            expect(item.ratio).toBe(0.4);
            expect(item.endRatio).toBe(0.4);
            expect(item.startRatio).toBe(0.2);
        });
    });
});
