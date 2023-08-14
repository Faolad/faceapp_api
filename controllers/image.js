const MODEL_ID = 'face-detection';

const clarifaiSetup = (imageUrl)=>{

  const PAT = '9a773a65780e48a59dedc86be90a3510';
  const USER_ID = 'devfaolad1';       
  const APP_ID = 'devfaolad';   
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions
}

export const handleApi = (req, res)=>{
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", clarifaiSetup(req.body.input))
        // .then(response => response.json())
        .then(resp => resp.json())
        .then(data => res.json(data))
        .catch(error => console.log('error', error));
}
//     fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", clarifaiSetup(req.body.input))
//     .then(data => {
//         console.log('DATA FROM API', data)
//         res.json(data);
//     })
//     .catch(err => res.status(400).json('Unable to connect to API'))
// }


export const imagePut = (req, res, db) =>{
    const {id} = req.body;

    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0].entries)
    })
    .catch(err => res.status(400).json('Unable to get entries'));
    // let found = false;
    // database.users.forEach(user=>{
    //     if (user.id === id){
    //         found = true;
    //         user.entries++
    //         return res.json(user.entries)
    //     }
    // })
    // if(!found){
    //     res.status(400).json("Not found")
    // }

}

