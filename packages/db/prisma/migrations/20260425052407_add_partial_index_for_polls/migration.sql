/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `poll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "poll_roomId_key" ON "poll"("roomId") WHERE ("status" = 'ACTIVE');
