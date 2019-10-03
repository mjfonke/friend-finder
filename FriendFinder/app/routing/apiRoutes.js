var friendData = require("../data/friends.js");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });


    app.post("/api/friends", function(req, res) {
        friendData.push(req.body);
        console.log(req.body);

        var scoreInput = req.body.scores
        var bestMatch = 0;
        var worstMatch = 0;
        
        for (var i = 0; i < friendData.length-1; i++) {
            var apiScores = friendData[i].scores;
            var totalDiff = 0;

            for (var j = 0; j < scoreInput.length-1; j++) {
                var diff = Math.abs(parseInt(scoreInput[j]) - parseInt(apiScores[j]));
                totalDiff = totalDiff + diff;
            }

            if (totalDiff < worstMatch) {
                worstMatch = totalDiff;
                bestMatch = i;
            }
        }

        res.send(friendData[bestMatch]);
    
});

}