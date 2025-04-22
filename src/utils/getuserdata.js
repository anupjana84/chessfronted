export const getUserdata = () => {
    const UserDetail = JSON.parse(localStorage.getItem("User Detail"));
    return UserDetail

}

export const getNotificationdata = () => {
    const Notificationdata = JSON.parse(localStorage.getItem("notification"));
    return Notificationdata

}

export const minutesToSeconds = (minutes) => {
    return minutes * 60;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const optionsDate = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);

    return formattedDate;
};

export function formatTime(inputTime) {
    if (!inputTime) {
        return ''; // or return a default value like 'Invalid time'
    }

    const [hour, minute] = inputTime.split(':');
    const date = new Date();

    // Set hours and minutes
    date.setHours(hour, minute);

    // Options for formatting time
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return formattedTime;
}

export const getScoreByUserAndRound = (data, userId, roundNumber) => {
    // console.log(data, userId, roundNumber, "round=====");
     // Find the user object by matching the 'user' field
     const userMatch = data.find(user => user.user === userId);
     // If the user is found, check for the round in 'roundWiseScore'
     if (userMatch) {
       const roundMatch = userMatch.roundWiseScore.find(round => round.roundNumber == roundNumber);
       // If the round is found, return the score, otherwise return null or a default value
       return roundMatch ? roundMatch.score : null;
     }
   
     // Return null or a default value if the user or round is not found
     return null;
  };
  

// export const generateRoundHeaders = (totalRounds) => {
//     if (totalRounds <= 0) return null; // Return null if there are no rounds

//     return Array.from({ length: totalRounds }, (_, i) => (
//         <th key={i} className="py-2 px-4 text-center">{`Round ${i + 1}`}</th>
//     ));
// };



