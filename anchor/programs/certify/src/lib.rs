use anchor_lang::prelude::*;

declare_id!("HEYaFCGw2M4W9xnrXxzoByfQhHr5uRMHiYGM5MoQPKq4");

#[program]
pub mod certify {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
