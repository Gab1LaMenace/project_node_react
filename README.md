Project Node&React at ESILV.

Team : William KAU, Carl KLINK, Romain Lefebvre, Gabin Lefrancois. Work done by each member : to complete

Sum up of the project : we did a music stream app. First you are in a menu page, where you can login or register either as a admin or user and they are predefined accounts. The register page check for missing input or if they already have a account with same username/email. If you connect as user you can listen to song, search them, create playlist. If you connect as admin you access to the list of accounts display with ag grid and the percentage of admin account vs user account us high charts.

Notify that we limit the number of music to 50 for them to not be to long to load. We get the music from an open source API named 'JAMENDO'.

We tried to link all the users to the database using POSTGRE SQL but didn't succeed so we did with a service that handle the account. Notify that we still leave some files in the backend to show our attempt of integration of a database.

To run our project you just need to execute 'ng serve' in the frontend.