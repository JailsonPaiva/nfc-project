// Tipos relacionados ao negócio
import { BaseEntity, PaginatedResponse } from './common';

export interface Event extends BaseEntity {
  name: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  price: number;
  status: EventStatus;
  businessId: string;
  sales: number;
  transactions: number;
}

export type EventStatus = 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';

export interface MenuItem extends BaseEntity {
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
  businessId: string;
}

export interface Transaction extends BaseEntity {
  userId: string;
  eventId?: string;
  menuItemId?: string;
  amount: number;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  description: string;
}

export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type PaymentMethod = 'nfc' | 'qr_code' | 'credit_card' | 'pix';

export interface BusinessMetrics {
  totalSales: number;
  activeEvents: number;
  totalTransactions: number;
  monthlyRevenue: number;
  growthRate: number;
}

export interface Report {
  id: string;
  businessId: string;
  period: ReportPeriod;
  data: BusinessMetrics;
  generatedAt: Date;
}

export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Notification extends BaseEntity {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  data?: Record<string, any>;
}

export type NotificationType = 'payment' | 'transaction' | 'security' | 'promotion' | 'system';
