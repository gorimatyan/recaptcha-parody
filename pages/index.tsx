import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import Main from '../components/Main'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  // 出力タイプの設定
  const [type, setType] = useState<number>(1);

  const changeType = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    setType(number);
  }
  console.log(type);


  return (
    <div className={styles.container}>
      <Head>
        <title>あなたはロボットですか？ reCAPTCHAパロディ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form action="#" method="post">
        <p>タイトル</p>
        <input type="text" placeholder="16字以内" />
        <div className='selectType' >
          <input onChange={(e) => changeType(e)} type="radio" name="type" id="typeA" value="1" />
          <label htmlFor="typeA">タイプA</label>
          <input onChange={(e) => changeType(e)} type="radio" name="type" id="typeB" value="9" />
          <label htmlFor="typeB">タイプB</label>
          <input onChange={(e) => changeType(e)} type="radio" name="type" id="typeC" value="16" />
          <label htmlFor="typeC">タイプC</label>
        </div>
      </form>

      <Main type={type}></Main>


      <footer className={styles.footer}>
        フッター
      </footer>
    </div>
  )
}

export default Home
