import { Router, Request, Response } from 'express';
import v1router from './v1/v1router';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({ health: 'OK' });
});

router.get('/health', async (req: Request, res: Response) => {
    res.status(200).json({ health: 'OK' });
});

router.use('/v1', v1router);

export default router;