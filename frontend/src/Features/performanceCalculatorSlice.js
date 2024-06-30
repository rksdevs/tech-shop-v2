import { apiSlice } from "./apiSlice";
import { PERFORMANCE_CAL_URL, SOCIAL_MEDIA_URL } from "../constants";

const performanceCalculatorSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        calculatePerformance: builder.mutation({
            query: (data) => ({
                url: `${PERFORMANCE_CAL_URL}/getPerformanceDetails`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Performance']
        }),
        getYoutubeVideos: builder.query({
            query:()=>({
                url:`${SOCIAL_MEDIA_URL}/getYoutube`,
            }),
            keepUnusedDataFor: 5
        }),
        getInstaProfileDetails: builder.query({
            query: ()=> ({
                url: `${SOCIAL_MEDIA_URL}/instaProfileDetails`
            }),
            keepUnusedDataFor: 5
        }),
        getInstaTopPosts: builder.query({
            query: ()=> ({
                url: `${SOCIAL_MEDIA_URL}/instaTopPosts`
            }),
            keepUnusedDataFor: 5
        }),
    })
})

export const {useCalculatePerformanceMutation, useGetYoutubeVideosQuery, useGetInstaProfileDetailsQuery, useGetInstaTopPostsQuery} = performanceCalculatorSlice