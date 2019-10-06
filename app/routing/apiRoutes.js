var friendData = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });


    app.post("/api/friends", function(req, res) {

        var newFriend = req.body;
        var diffArr = [];

        friendData.forEach(function(data) {
            
            for (var i = 0; i < newFriend.scores.length; i++) {
                var existing = data.scores[i];
                var newScore = newFriend.scores[i];
                var difference = Math.abs(existing - newScore);
            }

            diffArr.push(difference);
        });

        var minDiff = Math.min.apply(null, diffArr);

        var arrNum = diffArr.indexOf(minDiff);

        var bestMatch = friendData[arrNum];


        res.json(bestMatch);
        console.log(bestMatch);

        
        friendData.push(req.body);
        console.log(req.body);

    
});

}