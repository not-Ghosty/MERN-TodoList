current_dir=$(pwd)
cd $current_dir/frontend
npm install 
nohup npm run start &
cd $current_dir/backend
npm install
node index.js