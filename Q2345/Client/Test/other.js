// 文档集
// { _id: 'id1', planet: 'Mars', system: 'solar', inhabited: false }
// { _id: 'id2', planet: 'Earth', system: 'solar', inhabited: true }
// { _id: 'id3', planet: 'Jupiter', system: 'solar', inhabited: false }
// { _id: 'id4', planet: 'Omicron Persia 8', system: 'futurama', inhabited: true }

// 用一个文档替换另一个文档
db.update({ planet: 'Jupiter' }, { planet: 'Pluton'}, {}, function (err, numReplaced) {
    // numReplaced = 1
    // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
    // Note that the _id is kept unchanged, and the document has been replaced
    // (the 'system' and inhabited fields are not here anymore)
});

// 设定一个已存字段的值
db.update({ system: 'solar' }, { $set: { system: 'solar system' } }, { multi: true }, function (err, numReplaced) {
    // numReplaced = 3
    // Field 'system' on Mars, Earth, Jupiter now has value 'solar system'
});

// 设定一个不存在字段的值
db.update({ planet: 'Mars' }, { $set: { "data.satellites": 2, "data.red": true } }, {}, function () {
    // Mars document now is { _id: 'id1', system: 'solar', inhabited: false
    //                      , data: { satellites: 2, red: true }
    //                      }
    // Not that to set fields in subdocuments, you HAVE to use dot-notation
    // Using object-notation will just replace the top-level field
    db.update({ planet: 'Mars' }, { $set: { data: { satellites: 3 } } }, {}, function () {
        // Mars document now is { _id: 'id1', system: 'solar', inhabited: false
        //                      , data: { satellites: 3 }
        //                      }
        // You lost the "data.red" field which is probably not the intended behavior
    });
});

// 删除一个字段
db.update({ planet: 'Mars' }, { $unset: { planet: true } }, {}, function () {
    // Now the document for Mars doesn't contain the planet field
    // You can unset nested fields with the dot notation of course
});

// 设置upsert
db.update({ planet: 'Pluton' }, { planet: 'Pluton', inhabited: false }, { upsert: true }, function (err, numReplaced, upsert) {
    // numReplaced = 1, upsert = { _id: 'id5', planet: 'Pluton', inhabited: false }
    // A new document { _id: 'id5', planet: 'Pluton', inhabited: false } has been added to the collection
});

// If you upsert with a modifier, the upserted doc is the query modified by the modifier
// This is simpler than it sounds :)
db.update({ planet: 'Pluton' }, { $inc: { distance: 38 } }, { upsert: true }, function () {
    // A new document { _id: 'id5', planet: 'Pluton', distance: 38 } has been added to the collection
});

// If we insert a new document { _id: 'id6', fruits: ['apple', 'orange', 'pear'] } in the collection,
// let's see how we can modify the array field atomically

// $push inserts new elements at the end of the array
db.update({ _id: 'id6' }, { $push: { fruits: 'banana' } }, {}, function () {
    // Now the fruits array is ['apple', 'orange', 'pear', 'banana']
});

// $pop removes an element from the end (if used with 1) or the front (if used with -1) of the array
db.update({ _id: 'id6' }, { $pop: { fruits: 1 } }, {}, function () {
    // Now the fruits array is ['apple', 'orange']
    // With { $pop: { fruits: -1 } }, it would have been ['orange', 'pear']
});

// $addToSet adds an element to an array only if it isn't already in it
// Equality is deep-checked (i.e. $addToSet will not insert an object in an array already containing the same object)
// Note that it doesn't check whether the array contained duplicates before or not
db.update({ _id: 'id6' }, { $addToSet: { fruits: 'apple' } }, {}, function () {
    // The fruits array didn't change
    // If we had used a fruit not in the array, e.g. 'banana', it would have been added to the array
});

// $pull removes all values matching a value or even any NeDB query from the array
db.update({ _id: 'id6' }, { $pull: { fruits: 'apple' } }, {}, function () {
    // Now the fruits array is ['orange', 'pear']
});
db.update({ _id: 'id6' }, { $pull: { fruits: $in: ['apple', 'pear'] } }, {}, function () {
    // Now the fruits array is ['orange']
});

// $each can be used to $push or $addToSet multiple values at once
// This example works the same way with $addToSet
db.update({ _id: 'id6' }, { $push: { fruits: { $each: ['banana', 'orange'] } } }, {}, function () {
    // Now the fruits array is ['apple', 'orange', 'pear', 'banana', 'orange']
});

// $slice can be used in cunjunction with $push and $each to limit the size of the resulting array.
// A value of 0 will update the array to an empty array. A positive value n will keep only the n first elements
// A negative value -n will keep only the last n elements.
// If $slice is specified but not $each, $each is set to []
db.update({ _id: 'id6' }, { $push: { fruits: { $each: ['banana'], $slice: 2 } } }, {}, function () {
    // Now the fruits array is ['apple', 'orange']
});

// $min/$max to update only if provided value is less/greater than current value
// Let's say the database contains this document
// doc = { _id: 'id', name: 'Name', value: 5 }
db.update({ _id: 'id1' }, { $min: { value: 2 } }, {}, function () {
    // The document will be updated to { _id: 'id', name: 'Name', value: 2 }
});

db.update({ _id: 'id1' }, { $min: { value: 8 } }, {}, function () {
    // The document will not be modified
});