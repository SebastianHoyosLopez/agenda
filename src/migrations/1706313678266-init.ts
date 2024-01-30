import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1706313678266 implements MigrationInterface {
    name = 'Init1706313678266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reservation_earrings_access_level_enum" AS ENUM('30', '40', '50')`);
        await queryRunner.query(`CREATE TABLE "reservation_earrings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_level" "public"."reservation_earrings_access_level_enum" NOT NULL, "reservation_id" uuid, "earring_id" uuid, CONSTRAINT "PK_65d26d6dbe3b4ff596094324f22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservation_earrings" ADD CONSTRAINT "FK_848e5c6d61522c008cc17f6fa06" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation_earrings" ADD CONSTRAINT "FK_ecce93db0e7aaffc3d793fcae39" FOREIGN KEY ("earring_id") REFERENCES "earring"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation_earrings" DROP CONSTRAINT "FK_ecce93db0e7aaffc3d793fcae39"`);
        await queryRunner.query(`ALTER TABLE "reservation_earrings" DROP CONSTRAINT "FK_848e5c6d61522c008cc17f6fa06"`);
        await queryRunner.query(`DROP TABLE "reservation_earrings"`);
        await queryRunner.query(`DROP TYPE "public"."reservation_earrings_access_level_enum"`);
    }

}
