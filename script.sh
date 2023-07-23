current_dir=$(find . -name MERN_TodoList)
cd $current_dir/frontend
npm install 
nohup npm run start &
cd $current_dir/backend
nodemon index.js