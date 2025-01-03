## Approach

I tried to replicate the structure shown in the Workshop 8 demos, which took a while since I had to figure out how everything worked and fit together. For example, I had to learn how middleware handles authentication and spent some time reading up on Supabase ORM to get it working properly.

## Takeaways

This project taught me a lot about sticking with it when working on big, complicated codebases. I realized I actually enjoy that kind of challenge, even though it can be frustrating. It reminded me of the CS 339 labs where we were handed unfinished codebases (with zero documentation) and told to just write the functions. I definitely struggled with those labs, but I also liked them and want to keep improving at handling big projects like this—especially through DISC.

## Challenges

One big issue I ran into was my frontend not connecting to my backend. After a lot of debugging, I figured out it was because I forgot to set up CORS. Another challenge was understanding how the whole codebase fit together—from server.js to app.js and how that connects to authRoutes.js and userRoutes.js, then to their controllers. Early on, if something broke, I had to dig through a bunch of files to figure out what was going on. 