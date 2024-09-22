import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../src/services/axiosConfig";

export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async ({ page = 1, perPage = 5 }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/events?page=${page}&perPage=${perPage}`
      );
      return response.data.data; // Переконайся, що отримуєш `data` правильно
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// AsyncThunk для реєстрації події
export const registerEvent = createAsyncThunk(
  "events/register",
  async (values, thunkAPI) => {
    try {
      // Відправка POST-запиту на бекенд для реєстрації події
      const response = await axiosInstance.post("/events", values);

      // Успішна відповідь
      return response.data; // Або response.data.message якщо бекенд повертає повідомлення
    } catch (error) {
      // Повернення помилки, якщо запит не вдалий
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);
