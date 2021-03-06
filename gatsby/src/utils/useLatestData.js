import { useState, useEffect } from 'react';

const gql =String.raw;

const deets = gql`
  name
  _id
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;

export default function useLatestData(){
    //hot slices
    const [hotSlices, setHotSlices] = useState();
    //slicemasters
    const [slicemasters, setSlicemasters] = useState();
    //use a side effect to fetch the data from the graphql endpoint
    useEffect(function(){
        //when the component loads, fetch the data
        fetch(process.env.GATSBY_GRAPH_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
              query: gql`
                query {
                  StoreSettings(id: "downtown"){
                    name
                    slicemaster {
                      ${deets}
                    }
                    hotSlices {
                      ${deets}
                    }
                  }
                }
              `,
            }),
          })
            .then(res => res.json())
            .then(res => {
            //TODO: check for errors
            //set data to state
            setHotSlices(res.data.StoreSettings.hotSlices);
            setSlicemasters(res.data.StoreSettings.slicemaster);
        });
    }, []);
    return {
        hotSlices,
        slicemasters,
    };
}