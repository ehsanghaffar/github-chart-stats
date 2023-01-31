import axios from 'Axios';
import  { request } from './src/common/utils.js'

const getRepos = async () => {

  const data = await request("repos", "ehsanghaffar", "ehsanghaffar")

  const repos = data.data
  // console.log(repos.name)
  repos.map( (repo) => {
    console.log(repo.name)
  } )

}

const getUser = async () => {
  const userData = await request("users", "ehsanghaffar")

  const user = userData.data

  console.log(user)
}

getUser()