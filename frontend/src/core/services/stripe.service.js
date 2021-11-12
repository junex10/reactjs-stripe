import { api } from '../../commons/config';

export const confirmPaid = id => api.get(`/stripe/getPayments/${id}`)