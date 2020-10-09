import styled from '@emotion/styled'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, MutableRefObject, useRef, useState } from 'react'
import { MusicPlayerLayout } from '../../components/MusicPlayerLayout'
import withAuth from '../../hoc/withAuth'
import { colors } from '../../styles/colors'
import { Button } from '../login'

const Container = styled.div`
  display: grid;
  padding: 5rem 20%;
  grid-template-rows: 5rem 1fr 4rem;
  gap: 2rem;
`

const UploadArea = styled.div`
  border: 1px solid ${colors.mediumGray};
  border-radius: 5px;
  cursor: pointer;
  display: grid;
  justify-content: center;
  align-items: center;
  background: white;
  h1 {
    color: ${colors.darkGray};
    font-size: 1.8rem;
  }
  p {
    font-size: 1.2rem;
  }
`

const Rules = styled.p`
  align-self: center;
  font-size: 1.3rem;
  color: ${colors.darkGray};
  font-family: 'source code pro';
  span {
    font-weight: 700;
  }
`

const AddSong = () => {
  const router = useRouter()
  const fileRef = useRef() as MutableRefObject<HTMLInputElement>
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState(undefined)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const song = e.target.files[0]
    setFileName(song.name)
    setFile(song)
  }
  const uploadSong = async () => {
    const body = new FormData()
    body.append('song', file)
    const request = new Request(`${process.env.URL}/addTrack`, {
      method: 'POST',
      credentials: 'include',
      body
    })
    if (file) {
      try {
        const response = await fetch(request)
        if (response.status === 201) {
          const { id } = await response.json()
          router.push('/song/[id]', `/song/${id}`)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  return (
    <MusicPlayerLayout>
      <Container>
        <Head>
          <title>Add new song: VolumePeak</title>
        </Head>
        <Rules>
          You must customize the ID3 tags on your song file so our internal
          server can extract it and use it.
          <br />
          <span>* Required tags: title, year and artwork.</span>
        </Rules>
        <input ref={fileRef} type="file" onChange={handleFileChange} hidden />
        <UploadArea onClick={() => fileRef.current.click()}>
          {!fileName ? <h1>Choose file..</h1> : <p>{fileName}</p>}
        </UploadArea>
        <Button onClick={uploadSong}>Upload</Button>
      </Container>
    </MusicPlayerLayout>
  )
}

export default withAuth(AddSong)
