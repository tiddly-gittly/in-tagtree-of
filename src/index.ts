/**
  Finds out where a tiddler originates from, is it in a tag tree with xxx as root?
  
  based on:
  
  - https://github.com/bimlas/tw5-kin-filter/blob/master/plugins/kin-filter/kin.js
  - https://talk.tiddlywiki.org/t/recursive-filter-operators-to-show-all-tiddlers-beneath-a-tag-and-all-tags-above-a-tiddler/3814
*/

import type { IFilterOperator, IFilterOperatorParameterOperator, SourceIterator, Tiddler } from 'tw5-typed';

declare const exports: Record<string, IFilterOperator>;
exports['in-tagtree-of'] = function inTagTreeOfFilterOperator(
  source: (iter: SourceIterator) => void,
  operator: IFilterOperatorParameterOperator,
): ReturnType<IFilterOperator> {
  const rootTiddler = operator.operand;
  /**
   * By default we check tiddler passed-in is tagged with the operand (or is its child), we output the tiddler passed-in, otherwise output empty.
   * But if `isInclusive` is true, if tiddler operand itself is passed-in, we output it, even if the operand itself is not tagged with itself.
   */
  const isInclusive = operator.suffix === 'inclusive';
  /**
   * If add `!` prefix, means output the input if input is not in rootTiddlerChildren
   */
  const isNotInTagTreeOf = operator.prefix === '!';
  const rootTiddlerChildren = $tw.wiki.getGlobalCache(`in-tagtree-of-${rootTiddler}-${isInclusive ? 'includeRoot' : 'excludeRoot'}`, () => {
    const results: string[] = [];
    getTiddlersRecursively(rootTiddler, results);
    if (isInclusive) {
      return [rootTiddler, ...results];
    }
    return results;
  });
  const sourceTiddlerCheckedToBeChildrenOfRootTiddler: string[] = [];
  source((tiddler: Tiddler, title: string) => {
    // start the recursion for this title
    if (rootTiddlerChildren.includes(title) !== isNotInTagTreeOf) {
      sourceTiddlerCheckedToBeChildrenOfRootTiddler.push(title);
    }
  });
  return sourceTiddlerCheckedToBeChildrenOfRootTiddler;
};

function getTiddlersRecursively(title: string, results: string[]) {
  // get tagging[] list at this level
  const intermediate = $tw.wiki.getTiddlersWithTag(title);
  let t;
  let p;
  // remove any that are already in the results array to avoid loops
  // code adapted from $tw.utils.pushTop
  if (intermediate.length > 0) {
    if (results.length > 0) {
      if (results.length < intermediate.length) {
        for (t = 0; t < results.length; t++) {
          p = intermediate.indexOf(results[t]);
          if (p !== -1) {
            intermediate.splice(p, 1);
          }
        }
      } else {
        for (t = intermediate.length - 1; t >= 0; t--) {
          p = results.indexOf(intermediate[t]);
          if (p !== -1) {
            intermediate.splice(t, 1);
          }
        }
      }
    }
    // add the remaining intermediate results and traverse the hierarchy further
    $tw.utils.pushTop(results, intermediate);
    intermediate.forEach(function (title) {
      getTiddlersRecursively(title, results);
    });
  }
}
