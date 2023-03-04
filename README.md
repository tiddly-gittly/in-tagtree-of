# Fask "in TagTree of" check for TiddlyWiki5

A very fast version of `kin::to[xxx]`.

> Finds out where a tiddler originates from, is it in a tag tree with xxx as root?

## Usage

See [demo site](https://tiddly-gittly.github.io/in-tagtree-of/) for interactive examples.

### Normal usage

`[[Ling]in-tagtree-of[Clancy]]` : check if `Ling` is ''in a tag tree'' with `Clancy` as root.

`[all[tiddlers]!in-tagtree-of[Clancy]]` : with `!` prefix, get all tiddlers that are ''not'' in a tag tree with `Clancy` as root.

### Advanced usage

`[all[tiddlers]in-tagtree-of:inclusive[Clancy]]` : with `inclusive` suffix, get all tiddlers that are ''in a tag tree'' with `Clancy` as root, ''including `Clancy` himself''
