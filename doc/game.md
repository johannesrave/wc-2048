/*
entities:
game
row
tile
token
scoreboard

state:
position:
- implied by position in DOM?
  + looks nice
  + more WC-y, state could be in token component
  + harder to calculate stuff
- in central object?
  + easier to handle
  + could imply complete redraw on every move
    tokenId
    value
    justMerged
    score
    emptyTiles

-> gameState in 2D-array of tokens
-> id, position and value are saved in WC
-> redraw based on array on every turn
-> rows and tiles are static


thinking about it again:
WC don't seem to cover the usecase for this project:
these components are just meant for code-structuring,
not for reusability across projects.
maybe creating a board-component is more in the spirit of the technology:
- it could be told it's dimensions
- it could render tiles for that size
- it could render tokens with x/y positions into those tiles

the token could know that it is sliding...
so could implement the "transition" css-logic
*/
