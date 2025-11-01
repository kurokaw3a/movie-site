export const initialUrl = 'https://api.themoviedb.org/3'
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDUzYmFkOWQxNjBiMjgwYjVhODE0MmJjZmYyY2QyNSIsInN1YiI6IjY1ZDFjZTQ1YjQyMjQyMDE4N2IyZWVjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J249OrEFbORZCdeQ0LkjDkb8syAW-jduz6H1KKNOR5g'

export function ApiFetch(props) {
  const requestOptions = {
    method: props.method || 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  }
  if (props.method !== 'GET' && props.body) {
    requestOptions.body = JSON.stringify(props.body)
  }
  const promise = new Promise((resolve, reject) => {
    fetch(initialUrl + props.url, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.message)
      })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
  return promise
}
