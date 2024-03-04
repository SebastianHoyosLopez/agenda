import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1707496259335 implements MigrationInterface {
    name = 'Init1707496259335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."reservation_finances_access_level_enum" AS ENUM('30', '40', '50')`);
        await queryRunner.query(`CREATE TABLE "reservation_finances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_level" "public"."reservation_finances_access_level_enum" NOT NULL, CONSTRAINT "PK_4d67cf98962c43b373067420236" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reservation_finances"`);
        await queryRunner.query(`DROP TYPE "public"."reservation_finances_access_level_enum"`);
    }

}
