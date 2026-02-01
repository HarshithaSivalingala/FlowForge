ALTER TABLE "orders" DROP CONSTRAINT "orders_order_code_unique";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "due_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN "order_code";