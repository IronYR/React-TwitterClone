currently i am facing a problem: the problem is that how do i send the userID to the server so that it can save posts with the userID, get posts with the userID users credentials. Another problem which i think is the cause of this previous one is that posts are being saved without userID, so they are unable to send the correct data to the client. Currently i think the problem is in the way i am sending it to the server: when a user signs up, i send his id to the client. This id is passed from the topmost component to the createPost component where it is sent with the createPost request to the server through props. I am also using useState. So that could be the reason. the following solutions i think are worth trying: 

* use redux to store the id; use jwt to know which user; let all the requests pass through a middleware that gets the userID and stores in the req?



another problem i am facing is that if am able to send the userId data successfully through the funnel or whatever, when it is recieved on the client side, the userID._id is having problems in being converted into a valid ObjectID. have to find a way to get the string id which was previously an object id, back into a valid objectID. i think if i get the userID in the server, i could do this to create a post that also has the valid object id:

User.findById(//the id i got from the client//).then(res=>{
    let post = new Post({name: res.name, username:res.name.......});
    return post.save();
}).then(post=>{
    res.json({message:"sent successfully"});
}).catch(err=>{
    console.log(err)
})

this might work because mongoose automatically converts any string id into its corresponding ObjectID. InshaLAllah i will get this issue resolved



@todo for tomorrow

- fix the above problem @done
- set up login, also optionally send an email on successfull login @done
- get retweets and likes to work with icons
- get individual posts on click on the post@done
- redirect when user is auth or not and protect routess @done


### 20th August
fixed login thing but now i have the issue of protecting routes and making certain routes invisible. Likes do not work for some reason 

@todo for 21st:
//idea for like: let the isLiked be an array of userIDs which are stored whenver a user likes and when someone likes a post, check the array to see if he has already liked it. if yes, then decrease the OVERALL counter by one, if no increase it by one

also make it so that there is a one to many relationship between the user and post. whenever a post is created push that postID to the post array of the user @done


/// for comments: a one to many relation bw post and comments: whenever an individual post is requested, along with the post send all the comments aswell

// all the things i had to do on 20th



to fix: login works even if password wrong;i am directed to landing on successful logging up @done




//22nd goal

fix navigation and routes problem;question: why does sometimes on login it takes me to the landing page? need answers. But i have to be calm and patient. @done and solved hell yeah
all the things before


### 23rd goal

get retweets to work, style the user page and complete it, fix the image in createPost,let the user post comments, if done quickly, let users upload a photo of their choice
you have until 24 to do it all