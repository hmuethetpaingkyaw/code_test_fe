import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { allRoutes } from 'routes'
import { storeCache, getCache } from 'utli/cache'

const useTags = () => {
  const [tags, setTags] = useState([])

  const router = useHistory()

  const removeTag = (tag) => {
    const filteredTags = tags.filter((e) => e?.path !== tag?.path)
    storeCache('tags', JSON.stringify(filteredTags))
    setTags(filteredTags)
  }

  useEffect(() => {
    const currentRoute = router.location.pathname.replace('/', '')
    if (
      !['cargo-action-and-list', 'cargo-unload-action-and-list'].includes(
        currentRoute
      )
    ) {
      let cacheTags = getCache('tags') ? JSON.parse(getCache('tags')) : []
      if (!cacheTags.find((e) => e?.path === currentRoute)) {
        cacheTags.push(allRoutes.find((route) => route?.path === currentRoute))
        storeCache('tags', JSON.stringify(cacheTags))
      }
      setTags(cacheTags)
    }
  }, [router.location.pathname])

  return { tags, removeTag }
}

export default useTags
