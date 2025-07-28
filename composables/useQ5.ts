export const useQ5 = () => {
  const fetchList = () => {
    return fetch('/api/list').then(res => res.json())
  }
  
  const fetchDetail = (id: string) => {
    const now = Date.now()
    return fetch(`/api/detail/${id}`).then(res => res.json())
  }

  return {
    fetchList,
    fetchDetail
  }
}
