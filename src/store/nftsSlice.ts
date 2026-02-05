import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface NFT {
  id: string;
  name: string;
  symbol: string;
  image: string; // Placeholder
  currentBid: number; // Random
  endTime: number; // Timestamp
}

interface NftsState {
  items: NFT[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NftsState = {
  items: [],
  status: 'idle',
  error: null,
};

// Fetch NFTs from CoinGecko
export const fetchNfts = createAsyncThunk('nfts/fetchNfts', async () => {
  // Using the list endpoint as requested: https://api.coingecko.com/api/v3/nfts/list
  // Note: This returns a large list of { id, contract_address, name, asset_platform_id, symbol }
  // We will slice it to get the first 10-15 items and generate mock data for the rest.
  const response = await axios.get('https://api.coingecko.com/api/v3/nfts/list');
  const data = response.data.slice(0, 15);

  // Transform to our NFT interface with mock data for missing fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((item: any) => ({
    id: item.id,
    name: item.name,
    symbol: item.symbol,
    // Random placeholder image (using picsum or similar, or a gradient div in UI)
    // We'll use a placeholder service for now
    image: `https://picsum.photos/seed/${item.id}/400/400`, 
    currentBid: parseFloat((Math.random() * 5).toFixed(2)), // Random bid 0-5 ETH
    endTime: Date.now() + Math.random() * 86400000 * 2, // Random time within 48h
  }));
});

const nftsSlice = createSlice({
  name: 'nfts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNfts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNfts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchNfts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch NFTs';
      });
  },
});

export default nftsSlice.reducer;
