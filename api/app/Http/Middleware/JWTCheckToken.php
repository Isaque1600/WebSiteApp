<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\JWTAuth;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class JWTCheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     *
     * @return mixed
     *
     * @throws UnauthorizedHttpException
     */
    /**
     * The JWT Authenticator.
     */
    protected JWTAuth $auth;

    /**
     * Create a new BaseMiddleware instance.
     *
     * @return void
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Check the request for the presence of a token.
     *
     * @return void
     *
     * @throws BadRequestHttpException
     */
    public function checkForToken(Request $request)
    {
        if (!$this->auth->parser()->setRequest($request)->hasToken()) {
            throw new UnauthorizedHttpException('jwt-auth', 'Token not provided');
        }
    }

    /**
     * Attempt to authenticate a user via the token in the request.
     *
     * @return void
     *
     * @throws UnauthorizedHttpException
     */
    public function authenticate(Request $request)
    {
        try {
            $this->checkForToken($request);
            $payload = $this->auth->parseToken()->getPayload();

            $userPayload = $payload->get('user');
            if (is_null($userPayload)) {
                throw new UnauthorizedHttpException('jwt-auth', 'User data not found in token');
            }
            $user = new User($userPayload);
            $user->id = $payload->get('sub');

            if (!$user->id) {
                throw new UnauthorizedHttpException('jwt-auth', 'User ID not provided');
            }
            \Illuminate\Support\Facades\Auth::login($user);

        } catch (JWTException $e) {
            throw new UnauthorizedHttpException('jwt-auth', $e->getMessage(), $e, $e->getCode());
        }
    }

    public function handle($request, Closure $next)
    {
        $this->authenticate($request);

        return $next($request);
    }
}
