import { apiSlice } from "./apiSlice";
import { PERFORMANCE_CAL_URL } from "../constants";

const performanceCalculatorSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        calculatePerformance: builder.mutation({
            query: (data) => ({
                url: `${PERFORMANCE_CAL_URL}/getPerformanceDetails`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Performance']
        })
    })
})

export const {useCalculatePerformanceMutation} = performanceCalculatorSlice